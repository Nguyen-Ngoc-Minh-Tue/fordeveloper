import React, { useContext, useState } from "react";
import { Form, Modal, Select, Spin, Avatar } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { debounce } from "lodash";
import {
  query,
  collection,
  orderBy,
  where,
  limit,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      showSearch
      options={options.map((opt) => ({
        value: opt.value,
        label: (
          // <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <div>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </div>
          // </Select.Option>
        ),
      }))}
      // labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  // return db
  //   .collection('users')
  //   .where('keywords', 'array-contains', search?.toLowerCase())
  //   .orderBy('displayName')
  //   .limit(20)
  //   .get()
  //   .then((snapshot) => {
  //     return snapshot.docs
  //       .map((doc) => ({
  //         label: doc.data().displayName,
  //         value: doc.data().uid,
  //         photoURL: doc.data().photoURL,
  //       }))
  //       .filter((opt) => !curMembers.includes(opt.value));
  //   });

  const collectionRef = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("displayName"),
    limit(20)
  );
  // const collectionRef = query(collection(db, "users"));
  const querySnapshot = await getDocs(collectionRef);
  // const users: DocumentData[] = [];
  let options = [];
  options = querySnapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((opt) => !curMembers.includes(opt.value));

  return options;
}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    // reset form value
    form.resetFields();
    // setValue([]);

    // update members in current room
    // const roomRef = db.collection('rooms').doc(selectedRoomId);
    const roomRef = doc(db, "rooms", selectedRoomId);

    // roomRef.update({
    //   members: [...selectedRoom.members, ...value.map((val) => val.value)],
    // });
    if (selectedRoom) {
      updateDoc(roomRef, {
        members: [...selectedRoom.members, value],
      });
    }
    setValue("");
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            // mode='multiple'
            name="search-user"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}

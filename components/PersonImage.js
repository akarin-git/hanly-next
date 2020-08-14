import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import { updateUser } from "state/actions";
import { useAppContext, useAppAxiosExecute } from "hooks";
import Loader from "./Loader";

const AvatarImageCropper = dynamic(import("react-avatar-image-cropper"), {
  ssr: false,
});

function PersonImage({ src, canEdit }) {
  const { dispatch } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [
    { data: userImage, loading: uploading },
    uploadImage,
  ] = useAppAxiosExecute({
    url: "/api/me/image",
    contentType: "multipart/form-data",
  });

  const upload = (file) => {
    const params = new FormData();
    params.append("file", file);
    uploadImage(params);
  };

  useEffect(() => {
    if (userImage) {
      dispatch(updateUser({ face_image_url: userImage.face_image_url }));
      setIsOpen(false);
    }
  }, [userImage]);

  const openModal = () => {
    if (canEdit) {
      setIsOpen(true);
    }
  };

  const onClickModalScreen = (e) => {
    if (e.target.id && e.target.id.match(/modalScreen/)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="personImage">
      {!uploading && src && (
        <div
          className="img"
          style={{
            backgroundImage: `url("${src}")`,
          }}
          onClick={openModal}
        />
      )}
      {uploading || !src ? (
        <div
          className="img"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png")`,
          }}
          onClick={openModal}
        />
      ) : null}
      {isOpen && (
        <div
          id="modalScreen"
          className="modalScreen"
          onClick={onClickModalScreen}
        >
          <div className="modal">
            <AvatarImageCropper
              apply={upload}
              rootStyle={{
                border: "1px solid #efefef",
                width: "15.75rem",
                height: "15.75rem",
              }}
            />
          </div>
        </div>
      )}
      {uploading && <Loader />}
      <style jsx>
        {`
          .modalScreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal {
            min-width: 18.75rem;
            height: 21.125rem;
            background: #fff;
            padding: 1.5rem 1.5rem 3.875rem;
            box-shadow: 0px 1px 20px rgba(66, 57, 57, 0.15);
          }
          .img {
            line-height: 1;
            margin: auto;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-position: center;
            background-size: cover;
            border
          }
          .personImage {
            color: #222;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export default React.memo(PersonImage);

function PersonImage({ src }) {
  return (
    <div className="personImage">
      <img
        src={
          src ||
          "https://res.cloudinary.com/kiyopikko/image/upload/v1561617116/empty-user-image_o4ll8m.png"
        }
        alt=""
        width="80"
        className="img"
      />
      {/* <Loader v-if="isUploading" /> */}
      <style jsx>
        {`
          .personImage {
            color: #222;
            text-align: center;
          }

          .img {
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
}

export default React.memo(PersonImage);

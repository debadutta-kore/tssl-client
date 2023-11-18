import imgPlaceholder from "../../../../assets/icons/image-placeholder.svg";
import imgPlaceholderError from "../../../../assets/icons/image-placeholder-error.svg";
import deleteImage from "../../../../assets/icons/close-modal.svg";
import style from "./index.module.sass";
function UploadedImage(props) {
  const [name, ext] = props.name.split(".");
  const imgName =
    name.substr(0, 6) + (name.length <= 6 ? "." + ext : "..." + ext);
  return (
    <li
      className={
        props.isDuplicate
          ? `${style["upload-img-holder"]} ${style["duplicate"]}`
          : style["upload-img-holder"]
      }
    >
      <div className={style["img-overlay"]}>
        <img
          src={props.isDuplicate ? imgPlaceholderError : imgPlaceholder}
          alt="img-placeholder"
          width={20}
          height={20}
          className={props.isDuplicate ? style["duplicate"] : ""}
        />
        <span>{imgName}</span>
      </div>
      <button onClick={props.removeImg} type="button">
        <img src={deleteImage} alt={"delete-img"} width={30} height={30} />
      </button>
      <img
        src={props.url}
        alt={props.name}
        className={style["original-img"]}
        width="100%"
        height={90}
      />
    </li>
  );
}

export default UploadedImage;

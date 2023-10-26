import Modal, { ModalBody } from "..";
import Card from "../../card";
import style from "./index.module.sass";
import closeBtn from "../../../assets/icons/close-modal.svg";
import { Form, Formik } from "formik";
import fileUploadIcon from "../../../assets/icons/upload-cloud.svg";
import Button from "../../button";
import UploadedImage from "./uploadedImage";
function HelpSupport(props) {
  return (
    <Modal>
      <ModalBody style={{marginBlock:'10rem'}}>
        <Card>
          <div className={style["choose-user-header"]}>
            <h2>Help & Support</h2>
            <button className={style["close-btn"]} onClick={props.onClose}>
              <img src={closeBtn} alt="close-modal" />
            </button>
          </div>
          <Formik>
            <Form className={style["issue-submit-form"]}>
              <div className={style["issue-submit-form__radio-group"]}>
                <span
                  className={`${style["issue-submit-form__radio-group__label"]} ${style["required"]}`}
                >
                  Type
                </span>
                <div
                  className={style["issue-submit-form__radio-group__container"]}
                >
                  <div
                    className={
                      style[
                      "issue-submit-form__radio-group__container__radio-field"
                      ]
                    }
                  >
                    <input
                      type="radio"
                      name="type"
                      id="support"
                      value="support"
                      defaultChecked={true}
                    />
                    <label htmlFor="support">Support</label>
                  </div>
                  <div
                    className={
                      style[
                      "issue-submit-form__radio-group__container__radio-field"
                      ]
                    }
                  >
                    <input
                      type="radio"
                      name="type"
                      id="feedback"
                      value="feedback"
                    />
                    <label htmlFor="feedback">Feedback</label>
                  </div>
                </div>
              </div>
              <div className={style["form-field"]}>
                <label htmlFor="subject" className={style["required"]}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                />
              </div>
              <div className={style["form-field"]}>
                <label htmlFor="description" className={style["required"]}>
                  Description
                </label>
                <textarea
                  placeholder="Enter a description..."
                  id="description"
                  rows="6"
                ></textarea>
              </div>
              <div className={style["form-field"]}>
                <label
                  htmlFor="file-uploader"
                  className={style["form-field__file-uploader-label"]}
                >
                  <img
                    src={fileUploadIcon}
                    alt="file-upload-icon"
                    width={15}
                    height={15}
                  />
                  <span>
                    <b>Click to upload</b> or drag and drop
                  </span>
                  <span>PNG or JPG images</span>
                </label>
                <input
                  type="file"
                  id="file-uploader"
                  style={{ display: "none" }}
                />
              </div>
              <ul className={style["files-list"]}>
                <UploadedImage
                  url="https://images.pexels.com/photos/18759508/pexels-photo-18759508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  name="Example-abc-asdas-asdas-asda.jpg"
                />
                <UploadedImage
                  url="https://images.pexels.com/photos/18759508/pexels-photo-18759508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  name="Example-abc-asdas-asdas-asda.jpg"
                />
                <UploadedImage
                  url="https://images.pexels.com/photos/18759508/pexels-photo-18759508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  name="Example-abc-asdas-asdas-asda.jpg"
                />
                <UploadedImage
                  url="https://images.pexels.com/photos/18759508/pexels-photo-18759508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  name="Example-abc-asdas-asdas-asda.jpg"
                />
              </ul>
              <div className={style["btn-container"]}>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button>Send</Button>
              </div>
            </Form>
          </Formik>
        </Card>
      </ModalBody>
    </Modal>
  );
}
export default HelpSupport;

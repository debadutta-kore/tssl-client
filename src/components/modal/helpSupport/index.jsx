import Modal, { ModalBody } from "..";
import Card from "../../card";
import style from "./index.module.sass";
import closeBtn from "../../../assets/icons/close-modal.svg";
import { Field, Form, Formik } from "formik";
import fileUploadIcon from "../../../assets/icons/upload-cloud.svg";
import Button from "../../button";
import UploadedImage from "./uploadedImage";
import * as Yup from "yup";
import {
  emailBodySchema,
  emailFileValidation,
  emailSubjectSchema,
} from "../../../utilities/validateSchema";
function HelpSupport(props) {
  return (
    <Modal>
      <ModalBody style={{ marginBlock: "10rem" }}>
        <Card>
          <div className={style["choose-user-header"]}>
            <h2>Help & Support</h2>
            <button className={style["close-btn"]} onClick={props.onClose}>
              <img src={closeBtn} alt="close-modal" />
            </button>
          </div>
          <Formik
            initialValues={{
              type: "support",
              subject: "",
              description: "",
              screenshots: [],
            }}
            validationSchema={Yup.object().shape({
              subject: emailSubjectSchema,
              description: emailBodySchema,
              screenshots: Yup.array().of(emailFileValidation),
            })}
          >
            {(formik) => (
              <Form className={style["issue-submit-form"]}>
                <div className={style["issue-submit-form__radio-group"]}>
                  <span
                    className={`${style["issue-submit-form__radio-group__label"]} ${style["required"]}`}
                    id="radio-group"
                  >
                    Type
                  </span>
                  <div
                    role="group"
                    aria-labelledby="radio-group"
                    className={
                      style["issue-submit-form__radio-group__container"]
                    }
                  >
                    <label className={style["radio-label"]}>
                      <Field type="radio" name="type" value="support" />
                      <span>Support</span>
                    </label>
                    <label className={style["radio-label"]}>
                      <Field type="radio" name="type" value="feedback" />
                      <span>Feedback</span>
                    </label>
                  </div>
                </div>
                <div className={style["form-field"]}>
                  <label htmlFor="subject" className={style["required"]}>
                    Subject
                  </label>
                  <Field name="subject">
                    {({ field, meta }) => (
                      <>
                        <input
                          placeholder="Enter Subject"
                          id="subject"
                          name="subject"
                          className={
                            meta.touched && meta.error
                              ? style["error-input"]
                              : ""
                          }
                          required={true}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <span className={style["error"]}>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className={style["form-field"]}>
                  <label htmlFor="description" className={style["required"]}>
                    Description
                  </label>
                  <Field name="description">
                    {({ field, meta }) => (
                      <>
                        <textarea
                          placeholder="Enter a description..."
                          id="description"
                          rows="6"
                          className={
                            meta.touched && meta.error
                              ? style["error-input"]
                              : ""
                          }
                          name="description"
                          required={true}
                          {...field}
                        ></textarea>
                        {meta.touched && meta.error && (
                          <span className={style["error"]}>{meta.error}</span>
                        )}
                      </>
                    )}
                  </Field>
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
                    <span className={style['title']}>
                      <b>Click to upload</b> or drag and drop
                    </span>
                    <span className={style['sub-title']}>PNG or JPG images</span>
                  </label>
                  <input
                    type="file"
                    multiple={true}
                    accept="image/jpg, image/jpeg, image/png"
                    id="file-uploader"
                    style={{ display: "none" }}
                    name="screenshots"
                    onChange={(e) => {
                      console.log(e?.target?.files);
                      if (e?.target?.files && e.target.files.length > 0) {
                        formik.setFieldValue("screenshots", [
                          ...formik.values.screenshots,
                          ...e.target.files,
                        ]);
                      }
                    }}
                  />
                </div>
                <ul
                  className={
                    formik.values.screenshots.length > 2
                      ? style["files-list-lg"]
                      : style["files-list-sm"]
                  }
                >
                  {formik.values.screenshots.map((image, index) => (
                    <UploadedImage
                      url={URL.createObjectURL(image)}
                      name={image.name}
                      key={index}
                      removeImg={() => {
                        formik.setFieldValue(
                          "screenshots",
                          formik.values.screenshots.filter(
                            (_, ind) => ind !== index
                          )
                        );
                      }}
                    />
                  ))}
                </ul>
                <div className={style["btn-container"]}>
                  <Button onClick={props.onClose}>Cancel</Button>
                  <Button>Send</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </ModalBody>
    </Modal>
  );
}
export default HelpSupport;

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
  emailSchema,
  emailSubjectSchema,
} from "../../../utilities/validateSchema";
import request from "../../../utilities/request";
import { toast } from "react-toastify";
import InputField from "../../InputField";
import { useDispatch } from "react-redux";
const MAX_SIZE = 10 * 1024 * 1024;
function HelpSupport(props) {
  const dispatch = useDispatch();

  /**
   *
   * @param {Array} arr
   * @returns
   */
  const markDuplicate = (attachments) => {
    const fileNames = attachments.map((value)=>value.name);
    const duplicateIndexSet = fileNames.reduce((output,ele,index)=>{
      if(fileNames.indexOf(ele) !== index){
        output.add(index);
      }
      return output
    },new Set());
    if(duplicateIndexSet.size === 0) {
      return attachments;
    } else {
      return attachments.map((value,index) => {
        if (duplicateIndexSet.has(index)) {
          value.isDuplicate = true;
        } else {
          value.isDuplicate = false;
        }
        return value;
      });
    }
  };
  const onSubmitForm = (value, action) => {
    const formData = new FormData();
    formData.append("subject", value.subject);
    formData.append("description", value.description);
    formData.append("queryType", value.type);
    formData.append("to", value.to);
    value.attachments.forEach((attachment, index) => {
      formData.append(`file-${index}`, attachment);
    });
    request({
      url: "/email",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
      .then(() => {
        toast("Your response sent successfully!", { type: "success" });
        props.onClose();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            dispatch({ type: "reset" });
            toast("Your session has expired", { type: "error" });
          }
        }
        toast("Oops! Something went wrong try again", { type: "error" });
      })
      .finally(() => {
        action.setSubmitting(false);
      });
  };
  return (
    <Modal>
      <Formik
        initialValues={{
          type: "support",
          subject: "",
          to: "",
          description: "",
          attachments: [],
        }}
        onSubmit={onSubmitForm}
        validationSchema={Yup.object().shape({
          subject: emailSubjectSchema,
          description: emailBodySchema,
          to: emailSchema,
          attachments: Yup.array()
            .test(
              "attachments",
              "Total size of attachments must be less than 10MB",
              (attachments) => {
                const totalSize = attachments.reduce(
                  (acc, attachment) => acc + attachment.size,
                  0
                );
                return totalSize <= MAX_SIZE;
              }
            )
            .test(
              "is-unique",
              "Duplicate files are not allowed",
              function (attachments) {
                return (
                  attachments.length ===
                  new Set(attachments.map((attachment) => attachment.name)).size
                );
              }
            ),
        })}
      >
        {(formik) => (
          <ModalBody
            style={{
              marginBlock:
                formik.values.attachments.length === 0 ? "8rem" : "13rem",
            }}
          >
            <Card>
              <div className={style["choose-user-header"]}>
                <h2>Help & Support</h2>
                <button
                  disabled={formik.isSubmitting}
                  className={style["close-btn"]}
                  onClick={props.onClose}
                >
                  <img src={closeBtn} alt="close-modal" />
                </button>
              </div>
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
                <InputField
                  name="to"
                  type="email"
                  placeholder="Enter Email Id"
                  label="To"
                  required={true}
                />
                <InputField
                  type="text"
                  placeholder="Enter Subject"
                  id="subject"
                  name="subject"
                  label="Subject"
                  required={true}
                />
                <InputField
                  component="textarea"
                  name="description"
                  required={true}
                  label="Description"
                  rows="6"
                />
                <div className={style["form-field"]}>
                  <label
                    htmlFor="file-uploader"
                    className={style["form-field__file-uploader-label"]}
                    style={{
                      borderColor: formik.errors.attachments
                        ? "red"
                        : "#EAECF0",
                    }}
                  >
                    <img
                      src={fileUploadIcon}
                      alt="file-upload-icon"
                      width={15}
                      height={15}
                    />
                    <span className={style["title"]}>
                      <b>Click to upload</b> or drag and drop
                    </span>
                    <span className={style["sub-title"]}>
                      PNG or JPG images
                    </span>
                  </label>
                  {formik.errors.attachments && (
                    <span className={style["error-message"]}>
                      {formik.errors.attachments}
                    </span>
                  )}
                  <input
                    type="file"
                    multiple={true}
                    accept="image/jpg, image/jpeg, image/png"
                    id="file-uploader"
                    style={{ display: "none" }}
                    hidden={true}
                    name="attachments"
                    value={undefined}
                    onChange={(e) => {
                      if (e?.target?.files && e.target.files.length > 0) {
                        formik.setFieldValue("attachments", [
                          ...formik.values.attachments,
                          ...e.target.files,
                        ]);
                      }
                    }}
                  />
                </div>
                {formik.values.attachments.length > 0 && (
                  <ul className={style["files-list-lg"]}>
                    {markDuplicate(formik.values.attachments).map((image, index) => (
                      <UploadedImage
                        url={URL.createObjectURL(image)}
                        name={image.name}
                        key={index + "diwudeidc"}
                        isDuplicate={image.isDuplicate}
                        removeImg={() => {
                          formik.values.attachments.splice(index, 1);
                          formik.setFieldValue(
                            "attachments",
                            formik.values.attachments
                          );
                        }}
                      />
                    ))}
                  </ul>
                )}
                <div className={style["btn-container"]}>
                  <Button
                    onClick={props.onClose}
                    disabled={formik.isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={formik.isSubmitting}
                    disabled={!formik.isValid}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </Card>
          </ModalBody>
        )}
      </Formik>
    </Modal>
  );
}
export default HelpSupport;

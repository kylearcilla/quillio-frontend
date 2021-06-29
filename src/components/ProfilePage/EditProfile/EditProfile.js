import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import './EditProfile.css'

import useForm from '../../../utilities/useForm'
import { uploadImage } from '../../../utilities/uploadImage'
import { UPDATE_USER_INFO_MUTATION, DELETE_USER_MUTATION } from '../../../utilities/gqlTags'
import { SignForm, ImageInputForm, Button } from '../../../elements'
import { AuthContext } from '../../../authentication/AuthContext'

// Users' account details can be edited & has delete user funcitonality
const EditProfile = ({ editProfile, onClickEdit }) => {
    const history = useHistory();
    const [isDeleteClicked, setDeleteClicked] = useState(false);
    const { logout, loginOrRegister, data: userData } = useContext(AuthContext);
    const { onChangeHandler, onSubmitHandler, resetValues, values } = useForm(callback, {
        houseName: "",
        location: "",
        bio: "",
        profileImageURL: "",
        bannerURL: ""
    })

    const [updateProfileDetails] = useMutation(UPDATE_USER_INFO_MUTATION, {
        update(_, { data: { updateProfileDetails: updatedUserData } }) {
            loginOrRegister({ ...userData, ...updatedUserData });
            window.location.reload();
        }
    });
    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        update() { logout(); history.push("/"); window.location.reload(); }
    });

    async function uploadChanges() {
        let updatedValues = { ...values }
        if (values.profileImageURL != null && values.profileImageURL !== "") {
            const profileURL = await uploadImage(values.profileImageURL);
            updatedValues = { ...updatedValues, profileImageURL: profileURL };
        }
        if (values.bannerURL != null && values.bannerURL !== "") {
            const bannerURL = await uploadImage(values.bannerURL);
            updatedValues = { ...updatedValues, bannerURL: bannerURL };
        }
        updateProfileDetails({ variables: updatedValues });
    }

    function callback() { uploadChanges() }  // arrow functions are not hoisted 
    const cancelButtonHandler = () => { onClickEdit(); resetValues(); }
    const submitButtonHandler = (e) => { onSubmitHandler(e); onClickEdit(); resetValues(); }

    return (
        <div className={`edit-profile-page ${!editProfile && "off"}`} >
            {isDeleteClicked &&
                <div className="delete-user-modal">
                    <div className="delete-user-modal-box">
                        <h4>This action is permanent. Are you sure you want to delete you account m'lord?</h4>
                        <div className="delete-user-modal-buttons">
                            <Button
                                type="delete-modal cancel"
                                text="Never mind"
                                buttonHandler={() => (setDeleteClicked(false))}
                            />
                            <Button
                                type="delete-modal delete-user"
                                text="Yes, I am sure."
                                buttonHandler={() => (deleteUser())}
                            /> d
                        </div>
                    </div>
                </div>
            }
            <div className="edit-profile-modal">
                <div className="modal-container">
                    <h1>Edit Your Profile.</h1>
                    <div className="sign-in-up-inputs-two-box profile-page-edit">
                        <SignForm
                            title="House Name"
                            type="sign-in-up-page houseName profile"
                            textValue={values.houseName}
                            inputHandler={onChangeHandler}
                            placeholder="Targaryen"
                        />
                        <SignForm
                            title="Location"
                            type="sign-in-up-page location profile"
                            textValue={values.location}
                            inputHandler={onChangeHandler}
                            placeholder="Kings's Landing"
                        />
                    </div>
                    <SignForm
                        title="Biography"
                        type="sign-in-up-page bio profile"
                        textValue={values.bio}
                        inputHandler={onChangeHandler}
                        placeholder="When you play the game of thrones, you win or you die."
                    />
                    <div className="profile-edits-bottom">
                        <ImageInputForm
                            title="Profile Image"
                            property="profileImageURL"
                            onChangeHandler={onChangeHandler}
                            values={values}
                            resetValues={resetValues}
                        />
                        <ImageInputForm
                            title="Banner Image"
                            property="bannerURL"
                            onChangeHandler={onChangeHandler}
                            values={values}
                            resetValues={resetValues}
                        />
                    </div>
                    <button className="delete-user-button" onClick={() => (setDeleteClicked(true))}>Delete your account</button>
                    <div className="profile-edits-buttons">
                        <Button
                            type="profile-edits cancel-changes"
                            text="Cancel"
                            buttonHandler={cancelButtonHandler}
                        />
                        <Button
                            type="profile-edits save-changes"
                            text="Save"
                            buttonHandler={submitButtonHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
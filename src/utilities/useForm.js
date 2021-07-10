import { useState } from 'react'

// custom hook for handling form functionality w/ images
// used for editing account details, posting posts and comments
const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChangeHandler = (e) => {
        // files are not accessed through value, but by files, so sepration is required
        if (["imageURL", "profileImageURL", "bannerURL"].includes(e.target.classList[2])) {
            if (!e.target.files[0]) return;
            setValues({ ...values, [e.target.classList[2]]: e.target.files[0] });
            return;
        }
        setValues({ ...values, [e.target.classList[2]]: e.target.value });
    }
    const resetValues = (e) => {
        if (e && e.target.classList[2] === "cancel") {
            setValues({ ...values, imageURL: "" });
            return;
        }
        setValues({ ...values, ...initialState });
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        callback();
    };

    return {
        onChangeHandler,
        onSubmitHandler,
        resetValues,
        values
    }
}

export default useForm
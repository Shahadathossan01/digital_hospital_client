const checkUpdatedData=(data)=>{
    const updateFormData = Object.keys(data).reduce((acc, key) => {
        if (data[key].length !== 0) { // Check if the value length is not 0
            acc[key] = data[key];
        }
        return acc;
    }, {});

    return updateFormData
}

export default checkUpdatedData
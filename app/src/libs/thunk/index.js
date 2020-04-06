export const pseudoThunk = async (extra, params, dive) => {
    let data;

    typeof extra === 'function' ? (data = await extra(params)) : (data = extra);

    if (dive) {
        data = data.data;
        return { settings: data }; //ref this
    }

    return data;
};

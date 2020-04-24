type ExtraThunk = { (params: {} ):void };
type ExtraParams = [];
type ExtraDive = boolean;

export const pseudoThunk = async (extra:ExtraThunk, params: ExtraParams, dive: ExtraDive)  => {
    let data;

    typeof extra === 'function'
        ? (data = await extra(params))
        : (data = extra);

    if (dive) return { settings: data };

    return data;
};

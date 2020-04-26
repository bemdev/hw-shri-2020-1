type ExtraParams = [];
type ExtraDive = boolean;

export const pseudoThunk = async (extra:any, params: ExtraParams, dive?: ExtraDive)  => {
    if (typeof extra === 'function') {
        let data = await extra(params);

        if (dive) return { settings: data.data };

        return data;
    }
};

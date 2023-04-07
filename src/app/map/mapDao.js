//모든 시설 띄우기
async function selectFacilities(connection){
    const selectFacilitiesQuery = `
        select facility_id, la, lo, type 
        from facility;
    `;
    const [facilityOnMap] = await connection.query(selectFacilitiesQuery);
    return facilityOnMap;
}
//type별로 시설 띄우기
async function selectFacilitiesbyType(connection, type){
    const selectFacilitiesbyTypeQuery = `
        select facility_id, la, lo, type from facility where type = ?;
    `;
    const [facilitybyType] = await connection.query(selectFacilitiesbyTypeQuery,type);
    return facilitybyType;
}

module.exports={
    selectFacilities,
    selectFacilitiesbyType,
};
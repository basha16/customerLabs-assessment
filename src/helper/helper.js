export const schemas = [{
    name: 'First Name',
    value: 'first_name'
},
{
    name: 'Last Name',
    value: 'last_name'
},
{
    name: 'Gender',
    value: 'gender'
},
{
    name: 'Age',
    value: 'age'
}, {
    name: 'Account Name',
    value: 'account_name'
}, {
    name: 'City',
    value: 'city'
}, {
    name: 'State',
    value: 'state'
}]

const predefinedColors = ["success", "danger", "primary", "secondary", "info"];

export const mapUniqueSchema = (selectedSchemas) => {
    const uniqueSchema = schemas.filter(schema =>
        !selectedSchemas.some((selectedSchema) =>
            schema.value === selectedSchema.value
        )
    );
    return uniqueSchema
}

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
}



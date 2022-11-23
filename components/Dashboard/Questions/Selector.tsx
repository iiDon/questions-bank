import { Box } from '@chakra-ui/react';
import Select from 'react-select';

interface Props {
    options: any;
    placeholder: string;
}


const Selector = (Props: Props) => {
    const options = Props.options?.map((option: { id: string; name: string; }) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    console.log(Props.options);

    return (
        <Box ml={2}>
            <Select
                placeholder={Props.placeholder}
                isClearable={true}
                isSearchable={true}
                name="color"
                options={options}
            />
        </Box>
    )
}

export default Selector
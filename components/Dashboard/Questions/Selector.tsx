import { Box } from '@chakra-ui/react';
import Select from 'react-select';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
    placeholder: string;
    setter: React.Dispatch<React.SetStateAction<string | undefined>> 
}


const Selector = (Props: Props) => {
    const options = Props.options?.map((option: { id: string; name: string; }) => {
        return {
          value: option.id,
          label: option.name.substring(0, 7),
        };
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (selectedOption: any) => {
        Props.setter(selectedOption?.value);
    };

    return (
        <Box ml={2}>
            <Select
                onChange={handleChange}
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
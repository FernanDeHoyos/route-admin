import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Chip, Box, OutlinedInput, IconButton } from '@mui/material';
import { useForm } from '@/app/hooks/useForm'; 
import UploadIcon from '@mui/icons-material/Upload';

const fieldLabels = {
    referencia: 'Referencia',
    type: 'Tipo',
    name: 'Nombre',
    genero: 'Género',
    description: 'Descripción',
    price: 'Precio',
    salePrice: 'Precio de Oferta',
    images: 'Imágenes',
    colors: 'Colores',
    sizes: 'Tallas',
};

const validate = (formState) => {
    const errors = {
         
    };
   
    return errors;
};

const initialForm = {
    referencia:'',
    type: '',
    name: '',
    genero: '',
    description: '',
    price: '',
    salePrice: '',
    images: [],
    colors: [],
    sizes: [],
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const typeOptions = ['Camisetas', 'Accesorios', 'Calzados', 'Jeans'];
const generoOptions = ['Hombre', 'Mujer', 'Unisex'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green'];

export const FormProduct = () => {
    const { formState, errors, onInputChange, onReset } = useForm(initialForm, validate);
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const readFile = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        const promises = files.map(file => readFile(file));

        Promise.all(promises)
            .then(base64Files => {
                const newImages = base64Files.map((base64, index) => ({
                    file: files[index],
                    base64,
                }));

                setPreviews([...previews, ...newImages.map(image => image.base64)]);

                onInputChange({
                    target: {
                        name: 'images',
                        value: [...formState.images, ...newImages]
                    }
                });
            })
            .catch(error => console.error("Error converting images to base64:", error));
    };

    const handleRemoveImage = (index) => {
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);

        const newImages = formState.images.filter((_, i) => i !== index);
        onInputChange({
            target: {
                name: 'images',
                value: newImages
            }
        });
    };

    const handleSubmit = () => {
        console.log(formState);
    }

    return (
        <form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
           <TextField
                fullWidth
                label={fieldLabels.referencia}
                name="referencia"
                value={formState.referencia}
                onChange={onInputChange}
                error={!!errors.referencia}
                helperText={errors.referencia || ''}
                sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}
            />
            <FormControl fullWidth sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}>
                <InputLabel>{fieldLabels.type}</InputLabel>
                <Select
                    name="type"
                    value={formState.type}
                    onChange={onInputChange}
                    label={fieldLabels.type}
                >
                    {typeOptions.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}>
                <InputLabel>{fieldLabels.genero}</InputLabel>
                <Select
                    name="genero"
                    value={formState.genero}
                    onChange={onInputChange}
                    label={fieldLabels.genero}
                >
                    {generoOptions.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label={fieldLabels.name}
                name="name"
                value={formState.name}
                onChange={onInputChange}
                error={!!errors.name}
                helperText={errors.name || ''}
                sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}
            />

            <TextField
                fullWidth
                label={fieldLabels.description}
                name="description"
                value={formState.description}
                onChange={onInputChange}
                error={!!errors.description}
                helperText={errors.description || ''}
                sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}
            />

            <TextField
                fullWidth
                type="number"
                label={fieldLabels.price}
                name="price"
                value={formState.price}
                onChange={onInputChange}
                error={!!errors.price}
                helperText={errors.price || ''}
                sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}
            />

            <TextField
                fullWidth
                type="number"
                label={fieldLabels.salePrice}
                name="salePrice"
                value={formState.salePrice}
                onChange={onInputChange}
                error={!!errors.salePrice}
                helperText={errors.salePrice || ''}
                sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}
            />

            <FormControl fullWidth sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}>
                <InputLabel>{fieldLabels.colors}</InputLabel>
                <Select
                    name="colors"
                    multiple
                    value={formState.colors}
                    onChange={onInputChange}
                    input={<OutlinedInput label={fieldLabels.colors} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {colorOptions.map((color) => (
                        <MenuItem key={color} value={color}>
                            {color}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{
                    padding: 0,
                    width: { xs: '40%', md: '48%' },
                    m:1,
                    bgcolor: '#f8fcff',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el campo de texto
                    '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al hacer hover
                    },
                    '&:focused': {
                        borderColor: 'rgba(0, 0, 0, 0.5)', // Color de borde al estar enfocado
                        bgcolor: '#f8fcff'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(0, 0, 0, 0.5)', // Color del label
                    },
                }}>
                <InputLabel>{fieldLabels.sizes}</InputLabel>
                <Select
                    name="sizes"
                    multiple
                    value={formState.sizes}
                    onChange={onInputChange}
                    input={<OutlinedInput label={fieldLabels.sizes} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {sizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ width: '48%', padding: '8px' }}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon/>}
                    sx={{
                        width: '100%',
                        bgcolor: '#f8fcff',
                        borderRadius: 2,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            borderColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    }}
                >
                    {fieldLabels.images}
                    <input
                        type="file"
                        name="images"
                        multiple
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {errors.images && <p>{errors.images}</p>}
            </FormControl>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: '8px' }}>
                {previews.map((src, index) => (
                    <Box key={index} sx={{ position: 'relative', width: '120px', height: '120px', margin: '8px' }}>
                        <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <IconButton
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            sx={{ position: 'absolute', top: '5px', right: '5px' }}
                        >
                           <CloseIcon/>
                        </IconButton>
                    </Box>
                ))}
            </Box>
    <Button fullWidth   onClick={handleSubmit}> Subir </Button>
        </form>
    );
};



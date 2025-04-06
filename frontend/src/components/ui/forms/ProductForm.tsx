import { useState } from 'react';
import CustomButton from '../CustomButton';
import { useParams } from 'react-router-dom';
import { createProduct } from '../../../services/productService';
import Input from '../Input';
import Textarea from '../Textarea';
import FileInput from '../FileInput';

const ProductForm = ({ restaurantId, setModelOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    restaurantId: restaurantId,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(restaurantId, 'rest id');
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('restaurant_id', formData?.restaurantId);

    formDataToSubmit.append('image', formData?.image as any);
    setLoading(true);
    const res = await createProduct(formDataToSubmit);
    if (res) {
      setModelOpen(false);

      setLoading(false);
    }
    // onSubmit(formDataToSubmit);  // Calls the mutation function passed as prop
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className='my-2'>
          <label>Name:</label>
          <Input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2 mt-2 border rounded'
          />
        </div>

        <div className='my-2'>
          <label>Description:</label>
          <Textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full p-2 mt-2 border rounded'
          />
        </div>

        <div className='my-2'>
          <label>Price:</label>
          <Input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className='w-full p-2 mt-2 border rounded'
          />
        </div>

        <div className='my-2'>
          <label>Image:</label>
          {/* <Input
            type='file'
            name='image'
            onChange={handleChange}
            className='w-full p-2 mt-2 border rounded'
          /> */}

          <FileInput getFile={() => { }} />
        </div>

        <div className='my-2 flex justify-between'>
          <CustomButton type='submit' label='Add Menu Item' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

import { useState } from 'react';
import CustomButton from '../CustomButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Textarea from '../Textarea';
import { createProduct,updateProduct } from '../../../services/productService';
import { useQueryClient } from '@tanstack/react-query';

const ProductForm = ({ restaurantId, setModelOpen, selectedProduct }) => {
  const [loading, setLoading] = useState(false);
const queryClient = useQueryClient()
  console.log(restaurantId,'restaurant')
  const formik = useFormik({
    initialValues: {
      name: selectedProduct?.title || '',
      description: selectedProduct?.description || '',
      price: selectedProduct?.price || '',
      restaurant_id: restaurantId,
      image: null

    },
    enableReinitialize: true, // ✅ Important for pre-filling on edit
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      restaurant_id: Yup.string().required('Required'),
    }),

    onSubmit: async (values) => {
      setLoading(true);






      
      try {
        if (selectedProduct) {
          // 🛠 Update existing product
          await updateProduct(selectedProduct.id, values);
          queryClient.invalidateQueries({queryKey:['restaurant-owener-product-list']})

          
        } else {
          // ➕ Create new product
          await createProduct(values);
          queryClient.invalidateQueries({queryKey:['restaurant-owener-product-list']})

        }
        setModelOpen(false);
      } catch (err) {
        console.error('Submit error:', err);
      } finally {
        setLoading(false);
      }
    },
  });

  console.log(restaurantId,'restaurantId')

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
          <label>Name:</label>
          <Input
            type='text'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.name && formik.errors.name}
          />
        </div>

        <div className='my-2'>
          <label>Description:</label>
          <Textarea
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.description && formik.errors.description}
          />
        </div>

        <div className='my-2'>
          <label>Price:</label>
          <Input
            type='number'
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            className='w-full p-2 mt-2 border rounded'
            error={formik.touched.price && formik.errors.price}
          />
        </div>

  {/* Image Picker */}
  <div className='my-2'>
    <label>Image:</label>
    <input
      type='file'
      accept='image/*'
      onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
          formik.setFieldValue('image', file);
        }
      }}
      className='w-full p-2 mt-2 border rounded'
    />
  </div>



        <div className='my-2 flex justify-between'>
          <CustomButton
            type='submit'
            label={selectedProduct ? 'Update Menu Item' : 'Add Menu Item'}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

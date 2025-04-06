import { useState } from 'react';
import CustomButton from '../../../components/ui/CustomButton';
import Input from '../../../components/ui/Input';
import Model from '../../../components/ui/Model';
import ProductCard from '../../../components/ui/restaurant/product/ProductCard';
import ProductForm from '../../../components/ui/forms/ProductForm';
import { useSelector } from 'react-redux';

const RestaurantItemsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { restaurant } = useSelector((state) => state.auth)
  return (
    <>
      <Model
        openModel={openModal}
        setModelOpen={setOpenModal}
        body={<ProductForm restaurantId={restaurant?.id} />}
        title='Create a Product'
      />
      <div className='mb-10 flex items-center gap-10 justify-between'>
        <div className='w-full'>
          <Input
            type='search'
            name='search'
            className='p-5'
            placeholder='Search Product...'
            onChange={() => { }}
          />
        </div>
        <div className='max-w-44 w-full'>
          <CustomButton
            type='button'
            label={'Add Product'}
            className='py-4 px-10 font-semibold'
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-5'>
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
        <ProductCard
          id='1321'
          title='King Burger'
          description='akjdfhafd akdfjhas idfjahdfkas dfukghjaskdf sgjdhfgs jdfhgsjdfhg sjdhfgsjdfhgs djfhgsjdfhbsdfbs jdfhs jdfhgsjdf '
          subTitle='Hot & Scicy'
          price={250}
        />
      </div>
    </>
  );
};

export default RestaurantItemsPage;

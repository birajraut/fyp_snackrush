/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Input from "../../ui/Input"
import Textarea from "../../ui/Textarea"
import FileInput from "../../ui/FileInput"
import CustomButton from "../CustomButton";
import { createRestaurant } from "../../../services/restaurant"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';



interface IProps {
    setIsModalOpen: (data: boolean) => void
}


const RestaurantCreateForm = ({ setIsModalOpen }: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',

        },
        validateOnChange: false,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),

        }),
        onSubmit: async values => {
            try {
                setLoading(true)
                await createRestaurant(values)
                setIsModalOpen(false)
                setLoading(false)
                toast.success('Request Send SUccessfully and you will notify after the request is accepted')

            } catch (error: any) {
                console.log(error)
                toast.error('Error')
            }
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} className="space-y-3">
            <Input type="text" name="name" placeholder="Resturant Name" onChange={formik.handleChange} label="Resturant Name" error={formik.errors.name} />
            <Input type="email" name="email" placeholder="Resturant Email" onChange={formik.handleChange} label="Resturant Email" error={formik.errors.email} />
            <Input type="password" name="password" placeholder="Resturant Password" onChange={formik.handleChange} label="Resturant Password" error={formik.errors.password} />

            <Input type="password" name="confirm_password" placeholder="Confirm Password" onChange={formik.handleChange} label="Confirm Password" error={formik.errors.confirm_password} />



            <div className='mt-10'>
                <CustomButton type="submit" label="Request" loading={loading} className='mx-auto mt-10' />
            </div>


        </form>
    )
}

export default RestaurantCreateForm
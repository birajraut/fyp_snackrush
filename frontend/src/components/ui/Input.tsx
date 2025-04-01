import { twMerge } from 'tailwind-merge'
interface IProps { 
    type:string
    name:string
    onChange:()=>void
    placeholder?:string
    error?:string
    className?:string
    label?:string
}
const Input = ({type, name, onChange, placeholder, error, className, label}:IProps)=>{
    return (
        <>
        <div>
            <div className='text-slate-700 text-sm font-semibold mb-1'>{label}</div>
        <input type={type} name={name} onChange={onChange} placeholder={placeholder} className={twMerge(`w-full border ${error && 'border-red-500'} rounded-md outline-none py-2 px-4 text-sm ${className}`)} />
        {
            error &&  <div className="text-sm text-red-500">{error}</div>
        }
        </div>
        </>

    )
}

export default Input
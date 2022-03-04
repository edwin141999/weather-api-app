export default function ErrorPage({errorMessage}) {
    return (
        <div className='p-5 bg-red-600 rounded'>
            <p className='font-semibold text-white'>{errorMessage}</p>
        </div>
    );
}
import useAuthContext from '../context/authContext'

const Home = () => {
    const { user } = useAuthContext()

    return (
        <>
            <div className="mockup-window bg-base-300 m-6 shadow-2xl shadow-emerald-900">
                <div className="px-4 py-5 bg-base-200">
                    <pre data-prefix="$"><code>npm i middle-code </code></pre>
                    <pre data-prefix=">" className="text-warning"><code>installing...</code></pre>
                    <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                    <pre data-prefix=">" className="bg-success text-warning-content"><code>Hello!{user?.name}</code></pre>
                </div>
            </div>
        </>


    )
}

export default Home
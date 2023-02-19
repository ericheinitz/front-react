import useAuthContext from '../context/authContext'

const Home = () => {
    const { user } = useAuthContext()

    return (
        <>
            <div className="mockup-code m-20 shadow-2xl">
                <pre data-prefix="$"><code>npm i middle-code </code></pre>
                <pre data-prefix=">" className="text-warning"><code>installing...</code></pre>
                <pre data-prefix=">" className="text-success"><code>Done!</code></pre>
                <pre data-prefix=">" className="bg-warning text-warning-content"><code>Hello!{user?.name}</code></pre>
            </div>
        </>


    )
}

export default Home
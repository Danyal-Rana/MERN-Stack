import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';



function Github () {

    const githubData = useLoaderData()

    /*** 

    const [githubData, setGithubData] = useState({});

    useEffect(() => {
        fetch("https://api.github.com/users/Danyal-Rana")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGithubData(data);
            })
            .catch(error => {
                console.error('Error fetching Github data:', error);
            });
    }, []);

    ***/

    return (
        <div className='bg-gray-700 m-4 text-center text-white p-4 text-3xl'>
            <p>Github Name: {githubData.name}</p>
            <p>Github Repositories: {githubData.public_repos}</p>
            <img src={githubData.avatar_url} alt="Avatar" />
        </div>
    );
}


export default Github;

export const githubInfoLoader = async () => {
    const response = await fetch ('https://api.github.com/users/Danyal-Rana')
    return response.json()
}
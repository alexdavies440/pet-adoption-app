import { useState, useEffect } from "react";

export default function Organizations({ token }) {

    const [organizations, setOrganizations] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");


    useEffect(() => {
        getOrganizations();
    }, [token, page]);

    function getOrganizations() {
        let url = "";
        if (query === "") {
            url = `https://api.petfinder.com/v2/organizations?page=${page}&sort=name&limit=100`
        }
        else {
            url = `https://api.petfinder.com/v2/organizations?page=${page}&sort=name&query=${query}&limit=100`;
        }
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => setOrganizations(data.organizations))
            .then(window.scrollTo(0, 0));
    }

    function handleOrgSearch(event) {
        event.preventDefault();
        setPage(1);
        getOrganizations();
    }

    return (
        <div className="container organizations-container">
            <h1>Organizations</h1>

            <form className="organization-search" onSubmit={handleOrgSearch}>
                <label htmlFor="query"></label>
                <input type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <ul className="organization-list">
                {organizations.map((org) => (
                    <li key={org.id}>
                        <a className="organization-link" href={org.url} target="_blank">{org.name}</a>
                    </li>
                ))}
            </ul>

            {page > 1 &&
                <button onClick={() => setPage(page - 1)}>Back</button>
            }
            {organizations.length === 100 &&
                <button onClick={() => setPage(page + 1)}>Next Page...</button>
            }
        </div>
    );
}
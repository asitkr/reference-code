import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { fetchPosts } from "../redux/slices/postSlice";

const ShowFetchData = () => {
    const dispatch = useDispatch();
    const { data: users, loading: userLoading } = useSelector((state) => state.users);
    const { data: posts, loading: postLoading, error } = useSelector((state) => state.posts);

    console.log(error);
    

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchPosts());
    }, [dispatch]);
    return (
        <div className="p-10 space-y-10">
            <section>
                <h1 className="text-2xl font-bold mb-3 text-blue-700">Users</h1>
                {userLoading ? (
                    <p>Loading users...</p>
                ) : (
                    <ul className="space-y-2">
                        {users.map((u) => (
                            <li key={u.id} className="p-2 border rounded-md">
                                {u.name} — {u.email}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h1 className="text-2xl font-bold mb-3 text-green-700">Posts</h1>
                {postLoading ? (
                    <p>Loading posts...</p>
                ) : (
                    <ul className="space-y-2">
                        {posts.map((p) => (
                            <li key={p.id} className="p-2 border rounded-md">
                                <strong>{p.title}</strong>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default ShowFetchData;
const UsersList = ({ users }) =>
    <div className="user-list">
        <h4>Connected Users</h4>
        <hr className='line' />
        {users.map((user, index) => <h6 key={index}>{user}</h6>)}
    </div>

export default UsersList;
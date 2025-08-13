import { Suspense, useState } from 'react';
import { useUser } from '@/http/use-user';
import { useUsers } from '@/http/use-users';

type UserSelectProps = {
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;
};

function UserSelect({ selectedUserId, setSelectedUserId }: UserSelectProps) {
  const { data, error } = useUsers();

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <select
      onChange={(e) => setSelectedUserId(e.target.value)}
      value={selectedUserId || ''}
    >
      <option disabled value="">
        Select a user
      </option>
      {data?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

type UserDetailsContentProps = {
  selectedUserId: string;
};

function UserDetailsContent({ selectedUserId }: UserDetailsContentProps) {
  const { data: selectedUser, error: userError } = useUser({
    id: selectedUserId,
  });

  if (userError) {
    return <div>Error loading user details: {userError.message}</div>;
  }

  if (!selectedUser) {
    return <div>Loading user details...</div>;
  }

  return (
    <>
      <p>ID: {selectedUser.id}</p>
      <p>Name: {selectedUser.name}</p>
      <p>Username: {selectedUser.username}</p>
      <p>Email: {selectedUser.email}</p>
      <p>Phone: {selectedUser.phone}</p>
      <p>Website: {selectedUser.website}</p>
      <p>Company: {selectedUser.company.name}</p>
      <p>
        Address: {selectedUser.address.street}, {selectedUser.address.suite},{' '}
        {selectedUser.address.city}, {selectedUser.address.zipcode}
      </p>
      <p>
        Geo: {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}
      </p>
    </>
  );
}

export function UserDetails() {
  const [selectedUserId, setSelectedUserId] = useState('');

  return (
    <div>
      <h1>User Details</h1>

      <Suspense fallback={<div>Loading users...</div>}>
        <UserSelect
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </Suspense>

      {selectedUserId && (
        <Suspense fallback={<div>Loading user details...</div>}>
          <UserDetailsContent selectedUserId={selectedUserId} />
        </Suspense>
      )}
    </div>
  );
}

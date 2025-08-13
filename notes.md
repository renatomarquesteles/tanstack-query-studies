### Install Tanstack Query

```
npm i @tanstack/react-query
```

### Setup the QueryClientProvider using the queryClient instance

```
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
```

### Create a simple query

```
const {data, isLoading, error} = useQuery({
  queryKey: ['should-be-unique'],
  queryFn: getUsers
})
```

### isLoading x isPending x isFetching

- isLoading: true only on the first load, when there is no cached data and query is fetching for first time.
- isPending: true when the query is in a "pending" state, including initial load and refetches.
- isFetching: true whenever the query is actively fetching data regardless of whether there is cached data.

async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();

  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries}`);

      return fetchWithRetry(url, options, retries - 1);
    }

    throw error;
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1")
  .then(console.log)
  .catch(console.error);


//Output
//{
//  userId: 1,
//  id: 1,
//  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//  body: 'quia et suscipit\n' +
//    'suscipit recusandae consequuntur expedita et cum\n' +
//    'reprehenderit molestiae ut ut quas totam\n' +
//    'nostrum rerum est autem sunt rem eveniet architecto'
//}
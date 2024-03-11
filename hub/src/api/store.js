const storeApi = (url) => {
  return {
    postData: async (data) => {
      try {
        console.log({data, url})
        const responseStream = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const response = await responseStream.json();

        return response;
      } catch (e) {
        console.log("Hub: storeApi.postData error:", e);
        return false;
      }
    },
  };
};

export default storeApi;

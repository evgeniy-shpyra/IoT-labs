const storeApi = (url) => {
  return {
    postData: async (data) => {
      try {
       
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if(response.status !== 201){
          return false
        }
        const responseBody = await response.json();
        return {success: responseBody.success, payload: responseBody.data};
      } catch (e) {
        console.log("Hub: storeApi.postData error:", e);
        return false;
      }
    },
  };
};

export default storeApi;

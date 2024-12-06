import qs from "query-string";


const ApiCall = (domain) => {

  const perform = async (url, data, config) => {
    const response = await fetch(`${domain}/${url}`, {
        ...config,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(!response.ok) {
      throw new Error("Failed fetch users...");
    }

    return await response.json();
  };

  const get = async (path, searchParams={}) => {
    return await perform(`${path}?${qs.stringify(searchParams)}`);
  }; 

  
  const post = async (path, payload) => {
    return await perform (path, payload, {
        method: "POST"
    });
  };

  const put = async (path, payload) => {
    return await perform(path, payload, {
         method: "PUT"
    });   
  };

  const deleteData = async (path) => {
    return await perform(path, {
         method: "DELETE"
    });   
  };


  return { get, post, put, deleteData };

};

export default ApiCall;

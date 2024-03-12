export async function fetchdataplaces(){
    const response = await fetch('http://localhost:3000/places');
    const responsedata = await response.json();
    if (!response.ok) {
      throw new Error('failed to fetch the data');

    }

    return responsedata.places;
}


export async function fetchuserplaces(){
    const response = await fetch('http://localhost:3000/user-places');
    const responsedata = await response.json();
    if (!response.ok) {
      throw new Error('failed to fetch the user places');

    }

    return responsedata.places;
}


export async function updateuserplaces(places){
  
const response=await fetch('http://localhost:3000/user-places',
{
method:"PUT",
body:JSON.stringify({places}),
headers:{
    'Content-Type':'application/json'
}
}
);


const resdata=await response.json()


if(!response.ok){
    throw new Error("failed to update the data");
}
 
return resdata.message;

} 
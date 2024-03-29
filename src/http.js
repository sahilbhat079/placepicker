export async function fetchdataplaces(){
    const response = await fetch('https://placepic.vercel.app/api/places');
    const responsedata = await response.json();
    if (!response.ok) {
      throw new Error('failed to fetch the data');

    }

    return responsedata.places;
}


export async function fetchuserplaces(){
    const response = await fetch('https://placepic-sahil-ganis-projects.vercel.app/api/user-places');
    const responsedata = await response.json();
    if (!response.ok) {
      throw new Error('failed to fetch the user places');

    }

    return responsedata.places;
}


export async function updateuserplaces(places){
  
const response=await fetch('https://placepic-sahil-ganis-projects.vercel.app/api/user-places',
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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {Buffer} from "buffer"
import user from "../assets/user.svg"

type Props = {
    src: string,
    [key: string]: any,
}


function Avatar({src, className, ...props} : Props) {
  const query = useQuery({
      queryKey: [src],
      queryFn: async () => {
          const response = await axios.get(src, {responseType: 'arraybuffer'});
          let buffer = Buffer.from(response.data,'binary').toString("base64");
          let image = `data:${response.headers["content-type"]};base64,${buffer}`;
          return image
      }
  });

  return (
    (query.isError)?
      <img src={user} className={className} {...props}/>:
    (query.isLoading)?
      <img src={user} className={`${className} animate-pulse`}{...props} />:
      <img src={query.data} className={className} {...props} />
  )
}

export default Avatar
import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";

export default function Post(props) {
  const [post, setPost] = useState(false);
  useEffect(() => {
    const supabase = createClient(
      "https://cmqxnlontexbrcgilpqs.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcXhubG9udGV4YnJjZ2lscHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyMzgxMjYsImV4cCI6MTk2MzgxNDEyNn0.r-fRpNtLRnGUIji-sAu2ecAY-d635SsGHS08Va5-u20"
    );
    supabase
      .from("posts")
      .select("*")
      .then((obj) => {
        const loc = location.pathname;
        const lastDash = loc.lastIndexOf("/");
        console.log(loc.substring(lastDash + 1));
        console.log({ obj, location });
        //   console.log(posts.data);

        //   // Pass post data to the page via props
        setPost(obj.data.filter((x) => x.id == loc.substring(lastDash + 1)));
      });
  }, []);
  if (!post) return <i>indlæser</i>;
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}

// export async function getStaticPaths() {
//   const postsobj = await supabase.from("posts").select("*");
//   const posts = postsobj.data;
//   console.log(posts);
//   const paths = posts.map((post) => {
//     console.log(post);
//     return {
//       params: { id: "" + post.id },
//     };
//   });
//   console.log(paths);
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const posts = await supabase.from("posts").select("*");
//   console.log(posts.data);

//   // Pass post data to the page via props
//   return { props: { post: posts.data.filter((x) => x.id == params.id) } };
// }

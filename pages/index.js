import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const supabase = createClient(
  "https://cmqxnlontexbrcgilpqs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcXhubG9udGV4YnJjZ2lscHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyMzgxMjYsImV4cCI6MTk2MzgxNDEyNn0.r-fRpNtLRnGUIji-sAu2ecAY-d635SsGHS08Va5-u20",
  { global: { fetch } } // Note: this is not required as supabase-js uses the global fetch when available!
);

function Blog({ posts }) {
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
  return (
    <div>
      <h3 style={{ position: "absolute", top: 0, right: 0 }}>
        {post ? "Rune" : "indlæser"}
      </h3>
      fdjskl
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={"/post/" + post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const posts = await supabase.from("posts").select("*");
  return {
    props: {
      posts: posts.data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
export default Blog;

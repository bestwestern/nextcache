import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cmqxnlontexbrcgilpqs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcXhubG9udGV4YnJjZ2lscHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyMzgxMjYsImV4cCI6MTk2MzgxNDEyNn0.r-fRpNtLRnGUIji-sAu2ecAY-d635SsGHS08Va5-u20",
  { global: { fetch } } // Note: this is not required as supabase-js uses the global fetch when available!
);

function Blog({ posts }) {
  console.log(posts);
  return (
    <div>
      fdjskl
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.creator_id}</li>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const posts = await supabase.from("posts").select("*");
  console.log(posts.data);
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

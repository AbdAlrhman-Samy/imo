function deletePost(e, id) {

  const element = e.target.parentElement;

  return fetch(`/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res) => {
    element.innerHTML = "Post deleted successfully!";

    setTimeout(() => {
      element.parentElement.remove();
    }, 3500);
  }).catch((err) => {
    console.log(err);

    element.innerHTML = "Error deleting post!";
  });
}

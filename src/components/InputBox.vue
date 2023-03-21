<template>
  <div class="inputBox">
    <div class="input_post">
      <el-avatar :size="50" :fit="fit" src="src/images/Screenshot.png" />
      <div class="post_field">
        <p>What's on your mind?</p>
      </div>
    </div>
    <div class="add_attachments">
      <div>
        <img src="../images/video_img.png" />
        <b>Add Video</b>
      </div>
      <div>
        <img src="../images/add_image.png" />
        <b>Add Picture</b>
      </div>
      <div>
        <img src="../images/location.png" />
        <b>Add Locaton</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "input-box",
};
</script>

<style scoped>
.inputBox {
  height: 150px;
  width: 600px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 5px grey;
}
.input_post {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e6eb;
}

.post_field {
  width: 490px;
  display: flex;
  background-color: #f0f2f5;
  border-radius: 25px;
  align-items: center;
}
.post_field p {
  color: #65676b;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: larger;
  margin: 0px 0px 0px 25px;
}
.add_attachments {
  display: flex;
  width: 550px;
  margin-top: 18px;
  justify-content: space-around;
}
.add_attachments > div {
  display: flex;
  align-items: center;
}
.add_attachments b {
  margin-left: 5px;
  color: #65676b;
}
</style>

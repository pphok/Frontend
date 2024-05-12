<template>
  <v-container class="grey lighten-5" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="10" lg="8">
        <v-card class="elevation-2">
          <v-row>

            <!-- Profile Image and Job Title on the Left -->
            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <v-img
                class="rounded-image"
                src="https://assets.laliga.com/squad/2023/t178/p490541/2048x2048/p490541_t178_2023_1_002_000.jpg"
                height="300px"
                width="300px" 
              ></v-img>
              <div class="text-center mt-5">
                <h2 class="headline mb-0">John Doe</h2> <!-- Larger headline -->
                <span style="font-size: 20px;">Software Developer</span> <!-- Larger font size -->
              </div>
            </v-col>

            <!-- Other Information on the Right -->
            <v-col cols="12" md="6">
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon class="mr-5">
                    <v-icon size="40" class="mb-2" color="primary" >mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content style="font-size: 20px;">pedri@gmail.com</v-list-item-content> 
                </v-list-item>
                <!-- You can add more list items here for additional info -->
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProfilePage',
};
</script>

<style scoped>
/* Additional styles for larger elements */
.headline {
  font-size: 24px; /* Increased font size for the headline */
}

.rounded-image {
  border-radius: 50%;
  /* Ensure the image is contained without distortion */
  object-fit: cover; 
}

/* You can also increase the font size globally within this component */
</style>

<template>
  <section class="info">
    <div class="container">
      <section class="info__inner">
        <div class="info__column">
          <div class="info__photo">
            <img v-lazy="avatar" alt="user photo" />
          </div>
        </div>
        <div class="info__body">
          <div class="info__block">
            <p class="info__block-title">{{ user_labels.title }}</p>
            <div class="info__field">
              <span class="info__label">{{ user_labels.surname }}</span>
              <span class="info__cell">{{ user.last_name }}</span>
            </div>
            <div class="info__field">
              <span class="info__label">{{ user_labels.name }}</span>
              <span class="info__cell">{{ user.first_name }}</span>
            </div>
            <div class="info__field">
              <span class="info__label">{{ user_labels.occupation }}</span>
              <span class="info__cell">{{ employment }}</span>
            </div>
            <div class="info__field">
              <span class="info__label">{{ user_labels.age }}</span>
              <span class="info__cell">{{ user.age }}</span>
            </div>
          </div>

          <div class="info__block info__block--beer">
            <p class="info__block-title" @click="toggleBlock()">
              {{ beer_labels.title }}
              <svg
                class="info__block-arrow"
                :class="showOptions ? 'info__block-arrow--rotated' : ''"
                width="30"
                height="15"
              >
                <use xlink:href="#arrow-down"></use>
              </svg>
            </p>
            <slide-up-down :active="showOptions" v-bind:class="{ show: show }">
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.name"></span>
                <span class="info__cell" v-html="beer.name"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.style"></span>
                <span class="info__cell" v-html="beer.style"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.brand"></span>
                <span class="info__cell" v-html="beer.brand"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.hop"></span>
                <span class="info__cell" v-html="beer.hop"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.alcohol"></span>
                <span class="info__cell" v-html="beer.alcohol"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.blg"></span>
                <span class="info__cell" v-html="beer.blg"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.ibu"></span>
                <span class="info__cell" v-html="beer.ibu"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.malts"></span>
                <span class="info__cell" v-html="beer.malts"></span>
              </div>
              <div class="info__field">
                <span class="info__label" v-html="beer_labels.yeast"></span>
                <span class="info__cell" v-html="beer.yeast"></span>
              </div>
            </slide-up-down>
          </div>
          <button class="info__reload" @click="getNewData()">{{ newUser }}</button>
        </div>
      </section>
      <template v-if="preloader">
        <loader
          object="#efefef"
          color1="#ffffff"
          color2="#1a1725"
          size="5"
          speed="2"
          bg="#3E2F56"
          objectbg="#A299C5"
          opacity="80"
          name="circular"
        ></loader>
      </template>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Blank',
  data() {
    return {
      active: true,
      showOptions: false,
      duration: 500,
      show: false,
      beer: [],
      user: [],
      preloader: false,
      employment: '',
      avatar: '',
      newUser: 'Get new user',
      user_labels: {
        age: 'Age:',
        surname: 'Lastname:',
        name: 'Name',
        occupation: 'Occupation:',
        title: 'User info'
      },
      beer_labels: {
        title: 'Beer choice',
        name: 'Beer:',
        style: 'Style:',
        brand: 'Brand:',
        hop: 'Hop',
        alcohol: 'Alcohol:',
        blg: 'Blg:',
        ibu: 'Ibu:',
        malts: 'Malts:',
        yeast: 'Yeast:'
      }
    }
  },
  computed: {},

  mounted() {
    this.getData()
  },
  methods: {
    getAge(dateString) {
      var today = new Date()
      if (dateString !== undefined) {
        var birthDate = new Date(dateString)
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        return age
      }
    },
    async getData() {
      this.preloader = true
      if (this.preloader === true) {
        this.avatar = ''
      }
      await this.getBeer()
      await this.getUser()
      setTimeout(() => {
        this.preloader = false
      }, 1000)
    },
    toggleBlock() {
      this.showOptions = !this.showOptions
    },
    getNewData() {
      this.getData()
    },
    async getBeer() {
      const responseBeer = await axios
        .get('https://random-data-api.com/api/beer/random_beer')
        .catch(function (error) {
          console.log(error)
          return error.response
        })

      if (responseBeer.data) {
        this.beer = responseBeer.data
      }
    },
    async getUser() {
      const responseUser = await axios
        .get('https://random-data-api.com/api/users/random_user')
        .catch(function (error) {
          console.log(error)
          return error.response
        })
      if (responseUser.data) {
        this.user = responseUser.data
        this.employment = this.user.employment.title

        this.avatar = this.user.avatar

        this.user.age = this.getAge(this.user.date_of_birth)
      }
    }
  }
}
</script>

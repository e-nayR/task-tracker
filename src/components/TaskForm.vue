<template>
  <div class="container mb-3 mt-3">
    <form action="#" class="contact-form form-validate" novalidate="novalidate">
      <div class="row">
        <div class="col-sm-6 mb-3">
          <div class="form-group">
            <label class="required-field" for="firstName">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="Wendy"
            />
          </div>
        </div>
        <div class="col-sm-12 mb-3">
          <div class="form-group">
            <label class="required-field" for="message">How can we help?</label>
            <textarea
              class="form-control"
              id="message"
              name="message"
              rows="4"
              placeholder="Hi there, I would like to....."
            ></textarea>
          </div>
        </div>

        <div class="col-sm-12 mb-3">
          <button type="submit" name="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script></script>

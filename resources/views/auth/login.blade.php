@extends('auth.master')

@section('content')

<div class="d-flex flex-column flex-root">
			<!--begin::Login-->
			<div class="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
				<!--begin::Aside-->
				<div class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden" id="login-aside">
					<!--begin: Aside Container-->
					<div class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-5 py-lg-13 px-lg-25">
						<!--begin::Logo-->
						<a href="{{url('/')}}" class="text-center pt-2">
							<img src="{{asset('images/logo.png')}}" class="max-h-125px" alt="EQuran"  />
						</a>
						<!--end::Logo-->
						<!--begin::Aside body-->
						<div class="d-flex flex-column-fluid flex-column flex-center">
							<!--begin::Signin-->
							<div class="login-form login-signin py-11">
								<!--begin::Form-->
								<form method="POST" action="{{ route('login') }}" class="form" novalidate="novalidate" >
									<!--begin::Title-->
									@csrf

									<div class="text-center pb-8">
										<h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Sign In 1</h2>
										@if (Route::has('register') AND FALSE)
										<span class="text-muted font-weight-bold font-size-h4">Or
										<a href="javascript:;" class="text-primary font-weight-bolder" id="kt_login_signup">Create An Account</a></span>
										@endif
									</div>
									<!--end::Title-->
									<!--begin::Form group-->
									<div class="form-group">
                                        <label class="font-size-h6 font-weight-bolder text-dark">Username or Email</label>
                                        <input id="email" placeholder="Username or Email" type="text" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
										<!-- <input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="text" name="username" autocomplete="off" /> -->
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<div class="d-flex justify-content-between mt-n5">
											<label class="font-size-h6 font-weight-bolder text-dark pt-5">Password</label>
											@if (Route::has('password.request'))
												{{-- <a href="javascript:;" class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5" href="{{ route('password.request') }}" id="kt_login_forgot">
													{{ __('Forgot Your Password?') }}
												</a> --}}
											@endif
											<!-- <a href="javascript:;" class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5" id="kt_login_forgot">Forgot Password ?</a> -->
										</div>
										<input id="password" placeholder="Password" type="password" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
										@error('password')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
										<!-- <input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="password" name="password" autocomplete="off" /> -->
									</div>
									<!--end::Form group-->

									<!--begin::Form group-->
									{{-- <div class="form-group">
										<label class="checkbox mb-0">
										<input type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
										<span class="mr-2"> </span> {{ __('Remember Me') }}</label>
									</div> --}}
									<!--end::Form group-->

									<!--begin::Action-->
									<div class="text-right">
										<button id="kt_login_signin_submit" type="submit" class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3">
											{{ __('Login') }}
										</button>

										<!-- <button id="kt_login_signin_submit" class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3">Sign In</button> -->
									</div>
									<!--end::Action-->
								</form>
								<!--end::Form-->
							</div>
							<!--end::Signin-->
							@if (Route::has('register'))
							<!--begin::Signup-->
							<div class="login-form login-signup pt-11">
								<!--begin::Form-->

								<form class="form" method="POST" action="{{ route('register') }}" novalidate="novalidate" id="kt_login_signup_form">
								@csrf
									<!--begin::Title-->
									<div class="text-center pb-8">
										<h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Sign Up</h2>
										<p class="text-muted font-weight-bold font-size-h4">Enter your details to create your account</p>
									</div>
									<!--end::Title-->
									<!--begin::Form group-->
									<div class="form-group">
										<input id="first_name" type="text" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6 @error('first_name') is-invalid @enderror" placeholder="First Name" name="first_name" value="{{ old('first_name') }}" required autocomplete="first_name" autofocus>
										@error('first_name')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<input id="last_name" type="text" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6 @error('last_name') is-invalid @enderror" placeholder="Last Name" name="last_name" value="{{ old('last_name') }}" required autocomplete="lastname">
										@error('last_name')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<input id="username" type="text" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6 @error('username') is-invalid @enderror" placeholder="User Name" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
										@error('username')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<input id="email" type="email" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6 @error('email') is-invalid @enderror" placeholder="Email" name="email" value="{{ old('email') }}" required autocomplete="off">
										@error('email')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										@error('password')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
										<input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6" type="password" placeholder="Password" name="password" id="password" autocomplete="off" />
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6" type="password" name="password_confirmation" placeholder="Confirm password"  required autocomplete="off">
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<label class="checkbox mb-0">
										<input type="checkbox" name="agree" />I Agree the
										<a href="#">terms and conditions</a>.
										<span></span></label>
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
										<button type="button" id="kt_login_signup_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4">Submit</button>
										<button type="button" id="kt_login_signup_cancel" class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4">Cancel</button>
									</div>
									<!--end::Form group-->
								</form>

								<!--end::Form-->
							</div>
							<!--end::Signup-->
							@endif
							<!--begin::Forgot-->
							<div class="login-form login-forgot pt-11">
								<!--begin::Form-->
								<form class="form" method="POST" action="{{ route('password.email') }}" novalidate="novalidate" id="kt_login_forgot_form">
									@csrf
									<!--begin::Title-->
									<div class="text-center pb-8">
										<h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Forgotten Password ?</h2>
										<p class="text-muted font-weight-bold font-size-h4">Enter your email to reset your password</p>
									</div>
									<!--end::Title-->
									@if (session('status'))
										<div class="alert alert-success" role="alert">
											{{ session('status') }}
										</div>
									@endif
									<!--begin::Form group-->
									<div class="form-group">
										<input id="email" type="email" placeholder="Email" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6 @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

										@error('email')
											<span class="invalid-feedback" role="alert">
												<strong>{{ $message }}</strong>
											</span>
										@enderror
										<!-- <input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6" type="email" placeholder="Email" name="email" autocomplete="off" /> -->
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group d-flex flex-wrap flex-center pb-lg-0 pb-3">
										<button type="button" id="kt_login_forgot_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4">{{ __('Send Password Reset Link') }}</button>
										<button type="button" id="kt_login_forgot_cancel" class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mx-4">Cancel</button>
									</div>
									<!--end::Form group-->
								</form>
								<!--end::Form-->
							</div>
							<!--end::Forgot-->
						</div>
						<!--end::Aside body-->
						<!--begin: Aside footer for desktop-->
						<!-- <div class="text-center">
							<button type="button" class="btn btn-light-primary font-weight-bolder px-8 py-4 my-3 font-size-h6">
							<span class="svg-icon svg-icon-md">

								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
									<path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
									<path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
									<path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
								</svg>
							</span>Sign in with Google</button>
						</div> -->
						<!--end: Aside footer for desktop-->
					</div>
					<!--end: Aside Container-->
				</div>
				<!--begin::Aside-->
				<!--begin::Content-->
				<div class="content order-1 order-lg-2 d-flex flex-column w-100 pb-0 login-bg">

				</div>
				<!--end::Content-->
			</div>
			<!--end::Login-->
		</div>

@endsection

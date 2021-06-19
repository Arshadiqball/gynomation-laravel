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
							<img src="{{asset('images/logo.png')}}" class="max-h-75px" alt="EQuran" style=" filter: invert(1);" />
						</a>
						<!--end::Logo-->
						<!--begin::Aside body-->
						<div class="d-flex flex-column-fluid flex-column flex-center">
							<!--begin::Signin-->
							<div class="login-form login-signin py-11">

                                @if (session('status'))
                                    <div class="alert alert-success" role="alert">
                                        {{ session('status') }}
                                    </div>
                                @endif

								<!--begin::Form-->
								<form method="POST" action="{{ route('password.update') }}" class="form" novalidate="novalidate" id="kt_login_reset_form">
									<!--begin::Title-->
									@csrf
                                    <input type="hidden" name="token" value="{{ $token }}">
                                    
                                    <div class="text-center pb-8">
										<h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Reset Password</h2>
									</div>
									<!--end::Title-->
									<!--begin::Form group-->
									<div class="form-group">
                                        <label for="email" class="font-size-h6 font-weight-bolder text-dark">{{ __('E-Mail Address') }}</label>

                                            <input id="email" type="email" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                                            @error('email')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
									</div>
                                    <!--end::Form group-->
                                    
                                    <!--begin::Form group-->
									<div class="form-group">
                                        <label for="email" class="font-size-h6 font-weight-bolder text-dark">{{ __('Password') }}</label>

                                            <input id="password" type="password" placeholder="Password" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                            @error('password')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
									</div>
                                    <!--end::Form group-->

                                    <!--begin::Form group-->
									<div class="form-group">
                                        <label for="email" class="font-size-h6 font-weight-bolder text-dark">{{ __('Confirm Password') }}</label>
                                        <input id="password-confirm" type="password" placeholder="Confirm Password" class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" name="password_confirmation" required autocomplete="new-password">
									</div>
                                    <!--end::Form group-->
                                    
                                    <!--begin::Action-->
									<div class="text-center pt-2">
										<button id="kt_login_reset_submit" type="submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3">
											{{ __('Reset Password') }}
										</button>
										
										<!-- <button id="kt_login_signin_submit" class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3">Sign In</button> -->
									</div>
									<!--end::Action-->
									
								</form>
								<!--end::Form-->
							</div>
							<!--end::Signin-->
							
							
						</div>
						<!--end::Aside body-->
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


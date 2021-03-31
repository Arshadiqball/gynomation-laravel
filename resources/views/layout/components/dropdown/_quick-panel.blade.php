<!--begin::Quick Panel-->
<div id="kt_quick_panel" class="offcanvas offcanvas-left pt-5 pb-10">
			<!--begin::Header-->
			<div class="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
				<ul class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10" role="tablist">
					<li class="nav-item">
						<a class="nav-link active" data-toggle="tab" href="#kt_quick_panel_logs">System Logs</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-toggle="tab" href="#kt_quick_panel_notifications">Notifications</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-toggle="tab" href="#kt_quick_panel_settings">Settings</a>
					</li>
				</ul>
				<div class="offcanvas-close mt-n1 pr-5">
					<a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
						<i class="ki ki-close icon-xs text-muted"></i>
					</a>
				</div>
			</div>
			<!--end::Header-->
			<!--begin::Content-->
			<div class="offcanvas-content px-10">
				<div class="tab-content">
					<!--begin::Tabpane-->
					<div class="tab-pane fade show pt-3 pr-5 mr-n5 active" id="kt_quick_panel_logs" role="tabpanel">
						<!--begin::Section-->
						<div class="mb-15">
							<!--begin: Item-->
							<div class="d-flex align-items-center flex-wrap mb-5">
								<div class="symbol symbol-50 symbol-light mr-5">
									<span class="symbol-label">
										<img src="{{ asset('media/svg/misc/003-puzzle.svg') }}" class="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div class="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">New Users</a>
									<span class="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							<!--end: Item-->
							<!--begin: Item-->
							<div class="d-flex align-items-center flex-wrap mb-5">
								<div class="symbol symbol-50 symbol-light mr-5">
									<span class="symbol-label">
										<img src="{{ asset('media/svg/misc/005-bebo.svg') }}" class="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div class="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Active Customers</a>
									<span class="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							<!--end: Item-->
							<!--begin: Item-->
							<div class="d-flex align-items-center flex-wrap">
								<div class="symbol symbol-50 symbol-light mr-5">
									<span class="symbol-label">
										<img src="{{ asset('media/svg/misc/014-kickstarter.svg') }}" class="h-50 align-self-center" alt="" />
									</span>
								</div>
								<div class="d-flex flex-column flex-grow-1 mr-2">
									<a href="#" class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1">Bestseller Theme</a>
									<span class="text-muted font-weight-bold">Most Successful Fellas</span>
								</div>
								<span class="btn btn-sm btn-light font-weight-bolder my-lg-0 my-2 py-1 text-dark-50">+4500$</span>
							</div>
							<!--end: Item-->
						</div>
						<!--end::Section-->
					</div>
					<!--end::Tabpane-->
					<!--begin::Tabpane-->
					<div class="tab-pane fade pt-2 pr-5 mr-n5" id="kt_quick_panel_notifications" role="tabpanel">
						<!--begin::Nav-->
						<div class="navi navi-icon-circle navi-spacer-x-0">
							<!--begin::Item-->
							<a href="#" class="navi-item">
								<div class="navi-link rounded">
									<div class="symbol symbol-50 mr-3">
										<div class="symbol-label">
											<i class="flaticon2-download text-success icon-lg"></i>
										</div>
									</div>
									<div class="navi-text">
										<div class="font-weight-bold font-size-lg">2.8 GB-total downloads size</div>
										<div class="text-muted">Mostly PSD end AL concepts</div>
									</div>
								</div>
							</a>
							<!--end::Item-->
							<!--begin::Item-->
							<a href="#" class="navi-item">
								<div class="navi-link rounded">
									<div class="symbol symbol-50 mr-3">
										<div class="symbol-label">
											<i class="flaticon2-supermarket text-danger icon-lg"></i>
										</div>
									</div>
									<div class="navi-text">
										<div class="font-weight-bold font-size-lg">$2900 worth producucts sold</div>
										<div class="text-muted">Total 234 items</div>
									</div>
								</div>
							</a>
							<!--end::Item-->
							<!--begin::Item-->
							<a href="#" class="navi-item">
								<div class="navi-link rounded">
									<div class="symbol symbol-50 mr-3">
										<div class="symbol-label">
											<i class="flaticon-bell text-primary icon-lg"></i>
										</div>
									</div>
									<div class="navi-text">
										<div class="font-weight-bold font-size-lg">7 new user generated report</div>
										<div class="text-muted">Reports based on sales</div>
									</div>
								</div>
							</a>
							<!--end::Item-->
							<!--begin::Item-->
							<a href="#" class="navi-item">
								<div class="navi-link rounded">
									<div class="symbol symbol-50 mr-3">
										<div class="symbol-label">
											<i class="flaticon-paper-plane-1 text-success icon-lg"></i>
										</div>
									</div>
									<div class="navi-text">
										<div class="font-weight-bold font-size-lg">4.5h-avarage response time</div>
										<div class="text-muted">Fostest is Barry</div>
									</div>
								</div>
							</a>
							<!--end::Item-->
						</div>
						<!--end::Nav-->
					</div>
					<!--end::Tabpane-->
					<!--begin::Tabpane-->
					<div class="tab-pane fade pt-3 pr-5 mr-n5" id="kt_quick_panel_settings" role="tabpanel">
						<form class="form">
							<div class="separator separator-dashed my-2"></div>
							<!--begin::Section-->
							<div class="pt-2">
								<h5 class="font-weight-bold mb-3">General Setting</h5>
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Chat:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Email:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Notification:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">SMS:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Languages:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Subjects:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Packages:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Shift:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Remrks:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Issues:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							<!--end::Section-->
							<div class="separator separator-dashed my-6"></div>
							<!--begin::Section-->
								<h6 class="">Event Setting</h6>
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Noticeboard:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Holiday:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							</div>
							<!--end::Section-->
							<div class="separator separator-dashed my-6"></div>
							<!--begin::Section-->
							<h6 class="">Report Setting</h6>
							<div class="form-group mb-0 row align-items-center">
								<label class="col-4 col-form-label">Lesson:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
								<label class="col-4 col-form-label">Shift:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
							</div>

							<div class="form-group mb-0 row align-items-center">
								<label class="col-4 col-form-label">Attendance:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
								<label class="col-4 col-form-label">Salary:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
							</div>
							
							<div class="form-group mb-0 row align-items-center">
								<label class="col-4 col-form-label">Finance:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
								<label class="col-4 col-form-label">Relations:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
							</div>
							
							<div class="form-group mb-0 row align-items-center">
								<label class="col-4 col-form-label">Analytics:</label>
								<div class="col-2 d-flex justify-content-end">
									<span class="switch switch-sm switch-danger">
										<label>
											<input type="checkbox" checked="checked" name="select" />
											<span></span>
										</label>
									</span>
								</div>
							</div>
							
							<!--end::Section-->
							<div class="separator separator-dashed my-6"></div>
							<!--begin::Section-->
							<h6 class="">Module Setting</h6>
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Student:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Supervisor:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
								<!--end::Section-->
								<!--begin::Section-->
								<div class="form-group mb-0 row align-items-center">
									<label class="col-4 col-form-label">Teacher:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
									<label class="col-4 col-form-label">Admin:</label>
									<div class="col-2 d-flex justify-content-end">
										<span class="switch switch-sm switch-danger">
											<label>
												<input type="checkbox" checked="checked" name="select" />
												<span></span>
											</label>
										</span>
									</div>
								</div>
							<!--end::Section-->

							<!--end::Section-->

							</div>
						</form>
					</div>
					<!--end::Tabpane-->
				</div>
			</div>
			<!--end::Content-->
		</div>
		<!--end::Quick Panel-->
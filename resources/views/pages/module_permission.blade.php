@extends('master')

@section('content')

<div class="card custom-card">
    <div class="card-body">

        <ul class="nav nav-tabs nav-tabs-line mb-5">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#permissions_tab">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Permissions</span>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#assign_tab">
                    <span class="nav-icon"><i class="flaticon2-pie-chart-4"></i></span>
                    <span class="nav-text">Roles</span>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#roles_tab">
                    <span class="nav-icon"><i class="flaticon2-chat-1"></i></span>
                    <span class="nav-text">Role Wise Permissions</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#users_tab">
                    <span class="nav-icon"><i class="flaticon2-pie-chart-4"></i></span>
                    <span class="nav-text">User Wise Permissions</span>
                </a>
            </li>
        </ul>

        <div class="tab-content mt-5" id="myTabContent">
            <div class="tab-pane fade show active" id="permissions_tab" role="tabpanel" aria-labelledby="permissions_tab">

                {!! Form::open(['id'=>'addModulePermissionForm']) !!}
                <div class="row">
                    <div class="form-group col-md-4 col-lg-3">
                        @php $modulesData = [] @endphp
                        @foreach($modules as $module)
                            @php $modulesData[$module->id] = ucwords($module->name) @endphp
                        @endforeach
                        {!! Form::select('parent_id', $modulesData, null, ['class'=>'form-control selectpicker','title'=>'Select Module','required']) !!}
                    </div>
                    <div class="form-group col-md-4 col-lg-3">
                        {!! Form::text('name', null, ['class'=>'form-control permissionName','placeholder'=>'Permission Name','required']) !!}
                    </div>
                    <div class="form-group col-md-4 col-lg-3">
                        {!! Form::submit('Add Permission', ['class'=>'btn btn-primary']) !!}
                    </div>
                </div>
                {!! Form::close() !!}

                <div class="row">
                    <div class="col-xl-12">
                        <div id="module_table"></div>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="assign_tab" role="tabpanel" aria-labelledby="assign_tab">

                <div class="row">
                    <div class="col-xl-12">
                        <div id="role_table"></div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="roles_tab" role="tabpanel" aria-labelledby="roles_tab">
                <div class="row">
                    <div class="form-group col-md-4 col-lg-3">
                        @php $rolesData = [] @endphp
                        @foreach($roles as $role)
                            @php $rolesData[$role->id] = ucwords($role->name) @endphp
                        @endforeach
                        {!! Form::select('role', $rolesData, null, ['class'=>'form-control selectpicker','title'=>'Select Role']) !!}
                    </div>
                </div>
                {!! Form::open(['id'=>'modulePermissionForm']) !!}
                @foreach($permissions as $k => $permission)
                    @if($permission->parent_id == 0) @php $parent = $permission->id @endphp
                        <div class="accordion  accordion-toggle-arrow mb-2" id="accordionExample{{$k}}">
                            <div class="card">
                                <div class="card-header" id="headingOne{{$k}}">
                                    <div class="card-title collapsed" data-toggle="collapse" data-target="#collapseOne{{$k}}">
                                        <i class="flaticon2-layers-1"></i> {{ucwords($permission->name)}}
                                    </div>
                                </div>
                                <div id="collapseOne{{$k}}" class="collapse" data-parent="#accordionExample{{$k}}">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label class="col-form-label pb-0 font-weight-bolder">All Permissions</label><br>
                                                <input class="permission-select-checkbox" data-id="{{$permission->id}}" data-switch="true" data-on-text="Select" data-handle-width="70"  data-off-text="Unselect"  data-on-color="success" data-size="small" data-off-color="warning" type="checkbox" />
                                                <button type="button" class="btn btn-sm btn-default resetPermissions" data-permission="" data-id="{{$permission->id}}">Reset</button>
                                            </div>
                                            <div class="col-sm-6 text-sm-right permissions-div">
                                                <label class="col-form-label pb-0 font-weight-bolder">{{ucwords($permission->name)}} Module Access</label><br>
                                                <input class="permission-checkbox"  data-id="{{$permission->id}}" value="{{$permission->id}}" data-switch="true" data-on-text="Enabled" data-handle-width="70"  data-off-text="Disabled"  data-on-color="success" data-size="small" data-off-color="warning" name="permissions[]" type="checkbox" />
                                            </div>
                                        </div>
                                        <div class="col-md-12 separator separator-dashed my-5"></div>
                                        <div class="row permissions-div">
                                            @foreach($permissions as $per)
                                                @if($per->parent_id == $permission->id)
                                                    <div class="col col-sm mb-4">
                                                        <label class="col-form-label pb-0 font-weight-bolder">{{ucwords($per->name)}}</label><br>
                                                        <input class="permission-checkbox" data-parent="{{$permission->id}}" data-id="{{$per->id}}" value="{{$per->id}}" data-switch="true" data-handle-width="50" data-on-color="primary" data-size="small" data-off-color="danger" name="permissions[]" type="checkbox" />
                                                    </div>
                                                @endif
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                @endforeach
                <div class="text-right mt-3">
                    <button type="submit" class="btn btn-primary">Apply Permissions</button>
                </div>
                {!! Form::close() !!}
            </div>
            <div class="tab-pane fade" id="users_tab" role="tabpanel" aria-labelledby="users_tab">
                <div class="row">
                    <div class="form-group col-md-4 col-lg-3">
                        @php $rolesData = [] @endphp
                        @foreach($roles as $role)
                            @php $rolesData[$role->id] = ucwords($role->name) @endphp
                        @endforeach
                        {!! Form::select('role_id', $rolesData, null, ['class'=>'form-control selectpicker','title'=>'Select Role']) !!}
                    </div>
                    <div class="form-group col-md-4 col-lg-3">
                        {!! Form::select('user_id', [], null, ['class'=>'form-control selectpicker roleUsers','title'=>'Select User']) !!}
                    </div>
                </div>
                {!! Form::open(['id'=>'modulePermissionFormUser']) !!}
                @foreach($permissions as $k => $permission)
                    @if($permission->parent_id == 0) @php $parent = $permission->id @endphp
                        <div class="accordion  accordion-toggle-arrow mb-2" id="accordionExampleUser{{$k}}">
                            <div class="card">
                                <div class="card-header" id="headingOneUser{{$k}}">
                                    <div class="card-title collapsed" data-toggle="collapse" data-target="#collapseOneUser{{$k}}">
                                        <i class="flaticon2-layers-1"></i> {{ucwords($permission->name)}}
                                    </div>
                                </div>
                                <div id="collapseOneUser{{$k}}" class="collapse" data-parent="#accordionExampleUser{{$k}}">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label class="col-form-label pb-0 font-weight-bolder">All Permissions</label><br>
                                                <input class="permission-select-checkbox-user" data-id="{{$permission->id}}" data-switch="true" data-on-text="Select" data-handle-width="70"  data-off-text="Unselect"  data-on-color="success" data-size="small" data-off-color="warning" type="checkbox" />
                                                <button type="button" class="btn btn-sm btn-default resetPermissionsUser" data-permission="" data-id="{{$permission->id}}">Reset</button>
                                            </div>
                                            <div class="col-sm-6 text-sm-right permissions-div-user">
                                                <label class="col-form-label pb-0 font-weight-bolder">{{ucwords($permission->name)}} Module Access</label><br>
                                                <input class="permission-checkbox-user"  data-id="{{$permission->id}}" value="{{$permission->id}}" data-switch="true" data-on-text="Enabled" data-handle-width="70"  data-off-text="Disabled"  data-on-color="success" data-size="small" data-off-color="warning" name="permissions[]" type="checkbox" />
                                            </div>
                                        </div>
                                        <div class="col-md-12 separator separator-dashed my-5"></div>
                                        <div class="row permissions-div-user">
                                            @foreach($permissions as $per)
                                                @if($per->parent_id == $permission->id)
                                                    <div class="col col-sm mb-4">
                                                        <label class="col-form-label pb-0 font-weight-bolder">{{ucwords($per->name)}}</label><br>
                                                        <input class="permission-checkbox-user" data-parent="{{$permission->id}}" data-id="{{$per->id}}" value="{{$per->id}}" data-switch="true" data-handle-width="50" data-on-color="primary" data-size="small" data-off-color="danger" name="permissions[]" type="checkbox" />
                                                    </div>
                                                @endif
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                @endforeach
                <div class="text-right mt-3">
                    <button type="submit" class="btn btn-primary">Apply Permissions</button>
                </div>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</div>
{!! _attachScripts(isset($page_script) ? $page_script : null) !!}

@endsection

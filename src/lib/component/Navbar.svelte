<div class="navbar bg-base-100 max-w-3xl mx-auto">
	<div class="flex-1">
		<slot name="title">
			<a href="/" class="btn btn-ghost normal-case text-xl" title="Default">Default</a>
		</slot>
	</div>
	<div class="flex-none hidden sm:inline-flex">
		<ul class="menu menu-horizontal px-1">
			<slot name="links" />
		</ul>
	</div>
	<div class="dropdown dropdown-hover dropdown-bottom dropdown-end inline-block sm:hidden">
		<div tabindex="0" role="button" class="btn btn-ghost btn-sm">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h7"
				/></svg
			>
		</div>
		<ul
			tabindex="0"
			class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border-neutral border-2"
		>
			<slot name="links" />
		</ul>
	</div>
</div>

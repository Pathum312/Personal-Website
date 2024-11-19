<script lang="ts">
	import '$lib/styles/global.css';
	import { Header, Footer, Content } from '$lib';
</script>

<Header />
<Content>
	<slot />
</Content>
<Footer />
